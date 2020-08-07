import router from "@/router";
import session from "@/api/session";

const catchError = (error) => {
    return {
        error: true,
        errors: error.response.data,
        response: error.response,
        status: error.response.status
    }
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
    get(url, conf = {}) {
        return session.get(url, conf)
            .then(response => response.data)
            .catch(function (error) {
                catchMe(error);
            });
    },
    delete(url, conf = {}) {
        return session.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(function (error) {
                catchMe(error);
            });
    },
    post(url, data = {}, conf = {}) {
        return session.post(url, data, conf)
            .then(response => response.data)
            .catch(function (error) {
                catchMe(error);

                return catchError(error);
            });
    },
    put(url, data = {}, conf = {}) {
        this.patch(url, data, conf);
    },
    patch(url, data = {}, conf = {}) {
        return session.patch(url, data, conf)
            .then(response => response.data)
            .catch(function (error) {
                catchMe(error);

                return catchError(error);
            });
    }
}