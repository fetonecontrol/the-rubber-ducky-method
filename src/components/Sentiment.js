"use strict";
import React from 'react';
import { API_KEY, END_POINT } from '../key';


const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const key = API_KEY;
const endpoint = END_POINT;

export const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

export async function linkedEntityRecognition(client, input){

    const entityResults = await client.recognizeLinkedEntities(input);

    entityResults.forEach(document => {
        console.log(`Document ID: ${document.id}`);
        document.entities.forEach(entity => {
            console.log(`\tName: ${entity.name} \tID: ${entity.dataSourceEntityId} \tURL: ${entity.url} \tData Source: ${entity.dataSource}`);
            console.log(`\tMatches:`)
            entity.matches.forEach(match => {
                console.log(`\t\tText: ${match.text} \tScore: ${match.confidenceScore.toFixed(2)}`);
        })
        });
    });
    return entityResults;
}

export async function keyPhraseExtraction(client, input){

    const keyPhraseResult = await client.extractKeyPhrases(input);
    
    keyPhraseResult.forEach(document => {
        console.log(`ID: ${document.id}`);
        console.log(`\tDocument Key Phrases: ${document.keyPhrases}`);
    });
    return keyPhraseResult
} 
// export async function sentimentAnalysisWithOpinionMining(client, input){

//     const sentimentInput = [
//         {
//             text: "The food and service were unacceptable, but the concierge were nice",
//             id: "0",
//             language: "en"
//         }
//     ];
//     const sentimentResult = await client.analyzeSentiment(input, { includeOpinionMining: true });

//     sentimentResult.forEach(document => {
//         console.log(`ID: ${document.id}`);
//         console.log(`\tDocument Sentiment: ${document.sentiment}`);
//         console.log(`\tDocument Scores:`);
//         console.log(`\t\tPositive: ${document.confidenceScores.positive.toFixed(2)} \tNegative: ${document.confidenceScores.negative.toFixed(2)} \tNeutral: ${document.confidenceScores.neutral.toFixed(2)}`);
//         console.log(`\tSentences Sentiment(${document.sentences.length}):`);
//         document.sentences.forEach(sentence => {
//             console.log(`\t\tSentence sentiment: ${sentence.sentiment}`)
//             console.log(`\t\tSentences Scores:`);
//             console.log(`\t\tPositive: ${sentence.confidenceScores.positive.toFixed(2)} \tNegative: ${sentence.confidenceScores.negative.toFixed(2)} \tNeutral: ${sentence.confidenceScores.neutral.toFixed(2)}`);
//             console.log("    Mined opinions");
//             for (const { aspect, opinions } of sentence.minedOpinions) {
//                 console.log(`      - Aspect text: ${aspect.text}`);
//                 console.log(`        Aspect sentiment: ${aspect.sentiment}`);
//                 console.log("        Aspect confidence scores:", aspect.confidenceScores);
//                 console.log("        Aspect opinions");
//                 for (const { text, sentiment } of opinions) {
//                 console.log(`        - Text: ${text}`);
//                 console.log(`          Sentiment: ${sentiment}`);
//                 }
//             }
//         });
//     });
// }
// sentimentAnalysisWithOpinionMining(textAnalyticsClient)