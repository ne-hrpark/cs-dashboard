/**
 * OpenAPI 3.0 스펙 — 프론트엔드 개발자용 API 문서
 * Swagger UI: GET /api-docs
 */
export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: '회원 통계 대시보드 API',
    description:
      'DB(또는 Swagger 등으로 제공되는 API)를 호출하는 백엔드. MOCK=true 시 DB 없이 mock 데이터 반환.',
    version: '1.0.0',
  },
  servers: [
    { url: 'http://localhost:3001', description: '로컬 개발' },
    { url: '/', description: '상대 경로 (프록시 시)' },
  ],
  tags: [
    { name: 'Stats', description: '통계 집계 API' },
    { name: 'Users', description: '회원 목록 API' },
  ],
  paths: {
    '/api/stats/summary': {
      get: {
        tags: ['Stats'],
        summary: '전체 회원 통계',
        responses: {
          '200': {
            description: '성공',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    totalMembers: { type: 'integer', example: 12580 },
                    activeMembers: { type: 'integer', example: 9820 },
                    dormantMembers: { type: 'integer', example: 2100 },
                    withdrawnMembers: { type: 'integer', example: 660 },
                    todaySignups: { type: 'integer', example: 42 },
                    weekSignups: { type: 'integer', example: 318 },
                    monthSignups: { type: 'integer', example: 1250 },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/stats/trend': {
      get: {
        tags: ['Stats'],
        summary: '시계열 통계',
        parameters: [
          { name: 'period', in: 'query', schema: { type: 'string', enum: ['daily', 'weekly', 'monthly'], default: 'daily' }, description: '집계 단위' },
          { name: 'startDate', in: 'query', schema: { type: 'string', format: 'date' }, description: '시작일 (YYYY-MM-DD)' },
          { name: 'endDate', in: 'query', schema: { type: 'string', format: 'date' }, description: '종료일 (YYYY-MM-DD)' },
        ],
        responses: {
          '200': {
            description: '성공',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      periodDate: { type: 'string', example: '2025-01-15' },
                      count: { type: 'integer', example: 35 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/stats/age_groups': {
      get: {
        tags: ['Stats'],
        summary: '연령대별 통계',
        responses: {
          '200': {
            description: '성공',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      ageGroup: { type: 'string', example: '20대' },
                      count: { type: 'integer', example: 3850 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/stats/gender_groups': {
      get: {
        tags: ['Stats'],
        summary: '성별 통계',
        responses: {
          '200': {
            description: '성공',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      gender: { type: 'string', example: 'M' },
                      count: { type: 'integer', example: 6520 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/stats/region_groups': {
      get: {
        tags: ['Stats'],
        summary: '지역별 통계',
        responses: {
          '200': {
            description: '성공',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      region: { type: 'string', example: '서울' },
                      count: { type: 'integer', example: 3520 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/stats/signup_source': {
      get: {
        tags: ['Stats'],
        summary: '가입 경로별 통계',
        responses: {
          '200': {
            description: '성공',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      signupSource: { type: 'string', example: 'web' },
                      count: { type: 'integer', example: 5200 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/stats/status_groups': {
      get: {
        tags: ['Stats'],
        summary: '상태별 통계',
        responses: {
          '200': {
            description: '성공',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', example: 'active' },
                      count: { type: 'integer', example: 9820 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/stats/realtime': {
      get: {
        tags: ['Stats'],
        summary: '실시간 통계 (폴링용)',
        responses: {
          '200': {
            description: '성공',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    totalMembers: { type: 'integer' },
                    activeMembers: { type: 'integer' },
                    todaySignups: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: '회원 목록 (페이지네이션)',
        parameters: [
          { name: 'page', in: 'query', schema: { type: 'integer', default: 1 }, description: '페이지 번호' },
          { name: 'limit', in: 'query', schema: { type: 'integer', default: 10, maximum: 100 }, description: '페이지당 개수 (최대 100)' },
        ],
        responses: {
          '200': {
            description: '성공',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    data: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: { type: 'integer' },
                          email: { type: 'string' },
                          name: { type: 'string' },
                          gender: { type: 'string' },
                          region: { type: 'string' },
                          status: { type: 'string' },
                          signup_source: { type: 'string' },
                          created_at: { type: 'string', format: 'date-time' },
                        },
                      },
                    },
                    total: { type: 'integer', description: '전체 회원 수' },
                    page: { type: 'integer' },
                    limit: { type: 'integer' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        tags: [],
        summary: '헬스 체크',
        responses: { '200': { description: '서버 정상' } },
      },
    },
  },
};
