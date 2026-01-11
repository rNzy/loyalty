import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth & Cards (e2e)', () => {
  let app: INestApplication;
  let userAToken: string;
  let userBToken: string;

  beforeEach(async () => {
    // Ideally we should use a separate test DB or reset it, but for this quick check we'll just register new unique users
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
      await app.close();
  });

  it('should register and login users, and isolate cards', async () => {
    const timestamp = Date.now();
    const userA = {
        email: `userA_${timestamp}@test.com`,
        password: 'password123',
        username: 'UserA'
    };
    const userB = {
        email: `userB_${timestamp}@test.com`,
        password: 'password123',
        username: 'UserB'
    };

    // 1. Register User A
    await request(app.getHttpServer())
        .post('/auth/register')
        .send(userA)
        .expect(201);

    // 2. Login User A
    const loginARes = await request(app.getHttpServer())
        .post('/auth/login')
        .send(userA)
        .expect(201)
        .expect((res) => {
            expect(res.body.access_token).toBeDefined();
        });
    userAToken = loginARes.body.access_token;

    // 3. Create Card for User A
    await request(app.getHttpServer())
        .post('/cards')
        .set('Authorization', `Bearer ${userAToken}`)
        .send({ businessName: 'Cafe A', targetPoints: 10 })
        .expect(201);

    // 4. Register User B
    await request(app.getHttpServer())
        .post('/auth/register')
        .send(userB)
        .expect(201);

    // 5. Login User B
    const loginBRes = await request(app.getHttpServer())
        .post('/auth/login')
        .send(userB)
        .expect(201);
    userBToken = loginBRes.body.access_token;

    // 6. User B should have 0 cards
    await request(app.getHttpServer())
        .get('/cards')
        .set('Authorization', `Bearer ${userBToken}`)
        .expect(200)
        .expect((res) => {
            expect(res.body).toEqual([]);
        });
    
    // 7. User A should have 1 card
    await request(app.getHttpServer())
        .get('/cards')
        .set('Authorization', `Bearer ${userAToken}`)
        .expect(200)
        .expect((res) => {
            expect(res.body).toHaveLength(1);
            expect(res.body[0].businessName).toEqual('Cafe A');
        });
  });
});
