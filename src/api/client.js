import router from "@/router";
import session from "@/api/session";

const catchError = (error) => {
    return {
        error: true,
        errors: error.response.data,
        response: error.response,
        status: error.response.status
    };
};

const catchMe = (error) => {
    if (error.response) {
        if (error.response.status === 403) {
            // Permission Denied
            router.push({name: 'pages:error:403'});
        } else if (error.response.status === 404) {
            // Page Not Found
            router.push({name: 'pages:error:404'});
        } else if (error.response.status === 500) {
            // Internal Server Error
            router.push({name: 'pages:error:500'});
        }
    } else if (error.request) {
        // Timeout
        router.push({name: 'pages:error:408'});
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log(error);
    }
};

export default {
    async delete(url, conf = {}) {
        try {
            const response = await session.delete(url, conf);

            return response.data;
        } catch (error) {
            catchMe(error);

            return catchError(error);
        }
    },
    async get(url, conf = {}) {
        try {
            const response = await session.get(url, conf);

            return response.data;
        } catch (error) {
            catchMe(error);
        }
    },
    async options(url, conf = {}) {
        try {
            const response = await session.options(url, conf);

            return response.data;
        } catch (error) {
            catchMe(error);
        }
    },
    async patch(url, data = {}, conf = {}) {
        try {
            const response = await session.patch(url, data, conf);

            return response.data;
        } catch (error) {
            catchMe(error);

            return catchError(error);
        }
    },
    async post(url, data = {}, conf = {}) {
        try {
            const response = await session.post(url, data, conf);

            return response.data;
        } catch (error) {
            catchMe(error);

            return catchError(error);
        }
    },
    async put(url, data = {}, conf = {}) {
        await this.patch(url, data, conf);
    }
};