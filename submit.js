// import { VertexAI } from '@google-cloud/vertexai';

async function generateContent(goalValue, freqVal, hrPerDay, intensity, wants,type) {
// Initialize Vertex with your Cloud project and location
  

  
  
// Instantiate the models
  const generativeModel = vertex_ai.preview.getGenerativeModel({
    model: model,
    generationConfig: {
      'maxOutputTokens': 2048,
      'temperature': 1,
      'topP': 1,
    },
    safetySettings: [
      {
        'category': 'HARM_CATEGORY_HATE_SPEECH',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      },
      {
        'category': 'HARM_CATEGORY_HARASSMENT',
        'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
      }
    ],
  });

  const text1 = { text: `create a workout regimen where the goal is ${goalValue}, ${freqVal} days a week, ${hrPerDay} hours per day, ${intensity} intensity, focusing on ${type}. In addition, the user included the folowing wants: ${wants}. Do not give me further resources.` };


  const req = {
    contents: [
      { role: 'user', parts: [text1] }
    ],
  };

  const streamingResp = await generativeModel.generateContentStream(req);

  for await (const item of streamingResp.stream) {
    if (item && item.choices && item.choices.length > 0) {
      item.choices.forEach(choice => {
        if (choice.message && choice.message.content && choice.message.content.parts) {
          choice.message.content.parts.forEach(part => {
            if (part.text) {
              process.stdout.write('Text chunk: ' + part.text + '\n');
            }
          });
        }
      });
    }
  }
  const output = JSON.stringify(await streamingResp.response);
  const data = JSON.parse(output);
  console.log(data.candidates[0].content.parts[0].text);
  

}
const args = process.argv.slice(2);
const [goalValue, freqVal, hrPerDay, intensity, wants, type] = args;
generateContent(goalValue, freqVal, hrPerDay, intensity, wants,type)
