import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Tournaments application API',
            version: '1.0.0'
            // description: 'Документация API'
        },
        servers: [
            {
                url: 'http://localhost:8080/api'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        nickname: { type: 'string' }
                    }
                },
                TournamentShort: {
                    type: 'object',
                    properties: {
                        id: { type: 'string' },
                        name: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        participantsCount: { type: 'integer' }
                    }
                },
                TournamentDetail: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        createdAt: { type: 'string', format: 'date-time' },
                        creator: { $ref: '#/components/schemas/User' },
                        participants: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    userId: { type: 'integer' },
                                    tournamentId: { type: 'integer' },
                                    place: { type: 'integer', nullable: true },
                                    user: { $ref: '#/components/schemas/User' }
                                }
                            }
                        },
                        matches: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'integer' },
                                    step: { type: 'integer' },
                                    firstUser: {
                                        $ref: '#/components/schemas/User'
                                    },
                                    secondUser: {
                                        $ref: '#/components/schemas/User'
                                    },
                                    winner: {
                                        $ref: '#/components/schemas/User'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            requestBodies: {
                Auth: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    nickname: {
                                        type: 'string'
                                    },
                                    password: {
                                        type: 'string'
                                    }
                                },
                                required: ['nickname', 'password']
                            }
                        }
                    }
                }
            },
            responses: {
                Error: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                Auth: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    user: { $ref: '#/components/schemas/User' },
                                    token: {
                                        type: 'string'
                                    }
                                }
                            }
                        }
                    }
                },
                TournamentDetail: {
                    description: 'Детальная информация о турнире',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    tournament: {
                                        $ref: '#/components/schemas/TournamentDetail'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
