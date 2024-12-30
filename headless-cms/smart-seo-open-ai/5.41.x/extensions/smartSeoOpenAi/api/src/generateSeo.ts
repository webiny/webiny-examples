import { CmsGraphQLSchemaPlugin } from "@webiny/api-headless-cms";
import OpenAI from "openai";

/*
 * This file adds a GraphQL schema for generating SEO metadata.
 * It defines a generateSeo query to analyze input content.
 * The query outputs an SEO title, description, and keywords
 * and uses OpenAI’s GPT model to processes the content to generate metadata.
 * It uses Webiny’s CmsGraphQLSchemaPlugin to extend the Headless CMS GraphQL API.
 */


const OPENAI_API_KEY = process.env["WEBINY_API_OPEN_AI_API_KEY"];

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const generateSeo = () => [
    new CmsGraphQLSchemaPlugin({
        typeDefs: `
                type SeoData {
                    title: String
                    description: String
                    keywords: [String]
                }

                input GenerateSeoInput {
                    content: String!
                }

                type Query {
                    generateSeo(input: GenerateSeoInput!): SeoData
                }
            `,
        resolvers: {
            Query: {
                generateSeo: async (_, { input }) => {
                    try {
                        const { content } = input;

                        const response = await openai.chat.completions.create({
                            model: "gpt-3.5-turbo",
                            messages: [
                                {
                                    role: "system",
                                    content: `You will be provided with one or more paragraphs of HTML, and you need to extract an SEO optimized page title, a page summary, and up to 5 keywords. Response should be returned as a plain JSON object, with "title" field for the page title, "description" field for page summary, and "keywords" field as an array of keywords.`
                                },
                                {
                                    role: "user",
                                    content
                                }
                            ],
                            temperature: 0.5,
                            max_tokens: 128,
                            top_p: 1
                        });

                        const messageContent = response?.choices?.[0]?.message?.content;

                        if (typeof messageContent !== "string") {
                            console.error("Invalid or null content received from OpenAI.");
                            throw new Error("Failed to get a valid response from OpenAI.");
                        }

                        const seoData = JSON.parse(messageContent);
                        return {
                            title: seoData.title,
                            description: seoData.description,
                            keywords: seoData.keywords
                        };
                    } catch (error) {
                        console.error("Error generating SEO data:", error);
                        throw new Error("Failed to generate SEO data.");
                    }
                }
            }
        }
    })
];
