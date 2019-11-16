module.exports = class Objectifier {
    objectify(array) {
        const object = {};

        for (const entry of array) {
            const key = Object.keys(entry)[0];

            object[key] = entry[key];
        }

        return object;
    }
};
