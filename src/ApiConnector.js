
/* @class The Class for Connection to the RESTful-API */
export default class ApiConnector {
     constructor(config) {
        this.socket = WebSocket(config.apiUrl);
    }

    /* @function Transpile the JSON Format into an Object
     * @param request Requesting URL (without )
     * @param method A HTTP Method, possible are GET, PUT, POST and DELETE (string)
     * @return normal JS Object or an array of objects */
    doRequest(request, method) {
        var requestUrl = this.address + request;
        var requestMethod = (method === undefined) ? this.defaultMethod : method;

        try {
            this._verifyRequest(requestUrl, requestMethod);
        } catch {
            return null;
        }

        // TODO: In here we do something to get the right information

        var answer = ""; // something in JSON-Format

        var decomposedAnswer = this.decomposeAnswer(answer);

        try {
            this._verifyAnswer(decomposedAnswer);
        } catch {
            return null;
        }
        
        return decomposedAnswer;
    }

    /* @function Transpile the JSON Format into an Object
     * @param answer JSON formated Answer 
     * @return normal JS Object or an array of objects */
    decomposeAnswer(answer) {
        return JSON.parse(answer);
    }

    /* private @function Verifying the API-Request is not a wrong Request */
    _verifyRequest(requestUrl, method) {
        if (!["DELETE", "PUT", "POST", "GET"].some((element) => {
            if (element === method) { return true; } else {return false; }
        })) {
            throw Error("The method \"" + method + "\" are not available.");
        } else {
            return true;
        }
    }

    /* private @function Verifying the Answer including real information
     * @param decomposedAnswer Usable Answer as an Object (as an Array) */
    _verifyAnswer(decomposedAnswer) {
        // TODO: try to find a bad request status

        return true;
    }
}