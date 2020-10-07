"use strict";
import React, { useState, useEffect } from 'react'
import { API_KEY, END_POINT } from '../key';


const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const key = API_KEY;
const endpoint = END_POINT;

export const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));
//entity report
export async function linkedEntityRecognition(client, input){

    const entityResults = await client.recognizeLinkedEntities(input);
    return entityResults;
}
//key phrase extraction
export async function keyPhraseExtraction(client, input){

    const keyPhraseResult = await client.extractKeyPhrases(input);
    return keyPhraseResult
}
//sentiment analysis
export async function sentimentAnalysis(client, input){

    const sentimentResult = await client.analyzeSentiment(input);

    sentimentResult.forEach(document => {
        console.log(`ID: ${document.id}`);
        console.log(`\tDocument Sentiment: ${document.sentiment}`);
        console.log(`\tDocument Scores:`);
        console.log(`\t\tPositive: ${document.confidenceScores.positive.toFixed(2)} \tNegative: ${document.confidenceScores.negative.toFixed(2)} \tNeutral: ${document.confidenceScores.neutral.toFixed(2)}`);
        console.log(`\tSentences Sentiment(${document.sentences.length}):`);
        document.sentences.forEach(sentence => {
            console.log(`\t\tSentence sentiment: ${sentence.sentiment}`)
            console.log(`\t\tSentences Scores:`);
            console.log(`\t\tPositive: ${sentence.confidenceScores.positive.toFixed(2)} \tNegative: ${sentence.confidenceScores.negative.toFixed(2)} \tNeutral: ${sentence.confidenceScores.neutral.toFixed(2)}`);
        });
    });
    return sentimentResult;
}