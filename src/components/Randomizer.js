// Function to generate a UUID-like string
export const Randomizer = () => {
    // Generates a random 36-character UUID v4-like string
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0; // Random number between 0 and 15
        const v = c === 'x' ? r : (r & 0x3 | 0x8); // Uses 8, 9, A, or B for 'y'
        return v.toString(16); // Convert to hexadecimal
    });
};