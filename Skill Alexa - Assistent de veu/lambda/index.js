// És una mostra de com es podría utilitzar Alexa per preguntar per un manual en concret
// està preparada per ser utilitzada només durant el procés de la presentació del projecte

const Alexa = require('ask-sdk-core');

// S'inicia quan s'invoca l'aplicació
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Podrías empezar por quitarte el gorro ese que me llevas.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Dona un primer consell després d'haver iniciat la conversa
const QueMasHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'QueMasIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Corrige tu postura, ponte recto, coge aire y evita entrecortar tu voz.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Després del primer consell, se li diu que es començarà la venda del producte
const VentaHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VentaIntent';
    },
    handle(handlerInput) {
        const speakOutput = '¿Vender? ¿He oido vender? Es lo que mejor se me da, ¡Mi padre es Amazon! Ahora ya estás preparado, lo dejo en tus manos. ¡Ánimos Albert!';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Quan es demana ajuda a alexa per que expliqui com funciona aquesta skill
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Ahora mismo solo estoy programada para guiar al presentador, aunque no descartan mejorarme. Puedes pedime qué hacer más o avisarme cuando quieras vender el producto.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Quan es demana a Alexa que pari d'executar la Skill
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Perfecto, si me necesitas aquí estaré.';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};


const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Perdón, he tenido problemas para hacer lo que me has pedido. ¿Puedes volver a intentarlo?.`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        QueMasHandler,
        VentaHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
