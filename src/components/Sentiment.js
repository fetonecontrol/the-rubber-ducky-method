"use strict";
import React, { useState, useEffect } from 'react'
import { API_KEY, END_POINT } from '../key';


const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

const key = API_KEY;
const endpoint = END_POINT;

export const textAnalyticsClient = new TextAnalyticsClient(endpoint,  new AzureKeyCredential(key));

export async function linkedEntityRecognition(client, input){

    const entityResults = await client.recognizeLinkedEntities(input);
    
    // entityResults.forEach(document => {
        // console.log((`Document ID: ${document.id}`));
        // console.log(document);
        // document.entities.forEach(entity => {
        //     console.log(`\tName: ${entity.name} \tID: ${entity.dataSourceEntityId} \tURL: ${entity.url} \tData Source: ${entity.dataSource}`);
        //     console.log(`\tMatches:`)
        //     entity.matches.forEach(match => {
        //         console.log(`\t\tText: ${match.text} \tScore: ${match.confidenceScore.toFixed(2)}`);
        //     })
        // });
    // });
    return entityResults;
}

export async function keyPhraseExtraction(client, input){

    const keyPhraseResult = await client.extractKeyPhrases(input);
    
    // keyPhraseResult.forEach(document => {
    //     // console.log(`ID: ${document.id}`);
    //     // console.log(`\tDocument Key Phrases: ${document.keyPhrases}`);
    // });
    return keyPhraseResult
}