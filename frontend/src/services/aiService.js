import api from "./api";

const aiService = {

    async askAi(message) {

        const response = await api.post("/ai/chat", {
            message
        });

        return response.data.response;
    }

};

export default aiService;