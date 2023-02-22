const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

// shahash, return digest
const shaHash = (input) => {
    return crypto.createHash("sha3-512").update(input).digest("hex");
}

// set candidate based on event
const setCandidate = (event) => {

    let candidate;

    // check event
    if (event) {

        // if partitionkey, set candidate to partitionkey
        if (event.partitionKey) {
            candidate = event.partitionKey;

        // otherwise, stringify event and hash
        } else {
            const data = JSON.stringify(event);
            candidate = shaHash(data);
        }
    }

    return candidate;
}


// stringify candidate
const stringifyCandidate = (candidate) => {

    // check candidate
    if (candidate) {

        // if candidate not a string, stringify
        if (typeof candidate !== "string") {
            candidate = JSON.stringify(candidate);
        }

    } else {
        // if not candidate, set to global trivial
        candidate = TRIVIAL_PARTITION_KEY;
    }

    return candidate;
}

// update candidate based on length
const updateCandidate = (candidate) => {

    // check candidate length
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
        // hash
        candidate = shaHash(candidate);
    }

    return candidate;
}


exports.deterministicPartitionKey = (event) => {

    let candidate;

    // set candidate
    candidate = setCandidate(event);

    // stringify candidate
    candidate = stringifyCandidate(candidate);

    // update candidate
    candidate = updateCandidate(candidate);

    // return resulting candidate
    return candidate;
};
