import { LoremIpsum } from "lorem-ipsum";

export default function loremGenerator (numParagraph = 2, numWord = 24) {
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: 8,
            min: 1
        },
        wordsPerSentence: {
            max: 32,
            min: 8
        }
    });

    return {
        generateParagraphs: lorem.generateParagraphs(numParagraph),
        generateWords: lorem.generateWords(numWord)
    }
}