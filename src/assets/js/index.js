import $ from "jquery";

export const API_URL = import.meta.env.VITE_VERCEL_ENV;

export const registerVisit = async (data) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_URL}/visits`, options);

        const result = await response.json();

        return { ok: response.ok, result };
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const registerVisitor = async (data) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_URL}/visitors`, options);

        const result = await response.json();

        return { ok: response.ok, result };
    } catch (error) {
        console.error("Error:", error);
    }
};

export const editVisitor = async (id, data) => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_URL}/visitors/${id}`, options);

        const result = await response.json();

        return { ok: response.ok, result };
    } catch (error) {
        console.error("Error:", error);
    }
};

export const getUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const { data } = await response.json();
        return data;
    } catch (error) {}
};

export const getSingleVisitor = async (data) => {
    const { id, msisdn } = data;
    let response;

    try {
        if (id) {
            response = await fetch(`${API_URL}/visitors/${id}`);
        } else if (msisdn) {
            response = await fetch(`${API_URL}/visitors?search=${msisdn}`);
        }

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const { data } = await response.json();

        return data.data[0];
    } catch (error) {}
};

export const getVisits = async (query = {}) => {
    try {
        const {
            search = "",
            start = 0,
            limit = 20,
            sort = "",
            direction = "",
        } = query;

        let url = `${API_URL}/visits?start=${start}&limit=${limit}`;

        if (search) {
            url += `&search=${search}`;
        }

        if (sort) {
            url += `&sort=${sort}&direction=${direction}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(
                "Error getting visits. Please try again after few seconds"
            );
        }
        const { data } = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
};

export const getVisitors = async (query = {}) => {
    try {
        const {
            search = "",
            start = 0,
            limit = 20,
            sort = "",
            direction = "",
        } = query;

        let url = `${API_URL}/visitors?start=${start}&limit=${limit}`;

        if (search) {
            url += `&search=${search}`;
        }

        if (sort) {
            url += `&sort=${sort}&direction=${direction}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const result = await response.json();
        const { data, length } = result.data;

        return { data, length };
    } catch (error) {
        throw error;
    }
};

export const getVisitorWithVisits = async (id, query) => {
    try {
        const {
            search = "",
            start = 0,
            limit = 20,
            sort = "",
            direction = "",
        } = query;

        let url = `${API_URL}/visitors/${id}/visits?&start=${start}&limit=${limit}`;

        if (search) {
            url += `&search=${search}`;
        }

        if (sort) {
            url += `&sort=${sort}&direction=${direction}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const { data } = await response.json();
        console.log({ data });

        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const getEvents = async (id, data) => {
    try {
        let url = `${API_URL}events`;

        if (id) {
            url += `/${id}`;
        } else if (data.current) {
            url += `?current=1`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const { data: events } = await response.json();

        return events;
    } catch (error) {
        console.error("Error: ", error);
    }
};

export const getHosts = async (id) => {
    try {
        let url = `${API_URL}hosts`;

        if (id) {
            url += `/${id}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            console.log("Unable to get Host: ", response.body);
            throw new Error("Network response was not ok");
        }
        const { data: hosts } = await response.json();

        return hosts;
    } catch (error) {}
};

export const getRooms = async (id) => {
    try {
        let url = `${API_URL}rooms`;

        if (id) {
            url += `/${id}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const { data: rooms } = await response.json();

        return rooms;
    } catch (error) {}
};

export const registerHost = async (data) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_URL}/hosts`, options);

        const result = await response.json();

        return { ok: response.ok, result };
    } catch (error) {
        console.error("Error:", error);
    }
};

export const editHost = async (id, data) => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_URL}/hosts/${id}`, options);

        const result = await response.json();

        return { ok: response.ok, result };
    } catch (error) {
        console.error("Error:", error);
    }
};

export function visuallyHideModalBackdrop() {
    $(".modal-backdrop").addClass("visually-hidden");
}

export const updateDepartureTime = async (id, data) => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        const response = await fetch(`${API_URL}/visits/${id}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        return { ok: response.ok, result };
    } catch (error) {
        console.error("Error in updateDepartureTime: ", error);
        return { ok: false, result: error.message };
    }
};

export const getParticipants = async (id, query = {}) => {
    try {
        const {
            search = "",
            start = 0,
            limit = 20,
            sort = "",
            direction = "",
        } = query;

        let url = `${API_URL}/events/${id}/participants?start=${start}&limit=${limit}`;

        if (search) {
            url += `&search=${search}`;
        }

        if (sort) {
            url += `&sort=${sort}&direction=${direction}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const { data: participants } = await response.json();

        return participants;
    } catch (error) {
        console.log({ error });
    }
};

export const registerRoom = async (data) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_URL}/rooms`, options);

        const result = await response.json();

        return { ok: response.ok, result };
    } catch (error) {
        console.error("Error:", error);
    }
};

export const editRoom = async (id, data) => {
    try {
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };

        const response = await fetch(`${API_URL}/rooms/${id}`, options);

        const result = await response.json();

        return { ok: response.ok, result };
    } catch (error) {
        console.error("Error:", error);
    }
};
