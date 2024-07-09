class SelfWriter {
    /**
     * Creates an instance of SelfWriter.
     * 
     * @param {array} writingCollection - Collection of strings to be written.
     * @param {HTMLElement} writingContainer - HTML element where text is written.
     */
    constructor(writingCollection, writingContainer) {
        this.writingCollection = writingCollection;
        this.writingContainer = writingContainer;
        this.writingContainer.innerHTML = "";
        this.currentWord = 0;
        this.currentIndex = 0;
        this.direction = "right";
        this.alreadyWritten = "";

        // Start writing process with an interval of 100 milliseconds
        this.interval = setInterval(() => { this.write(this); }, 100);
    }

    /**
     * Writes the text into the writing container.
     * 
     * @param {SelfWriter} object - SelfWriter object instance.
     */
    write(object) {
        object.checkIndex();

        if (object.currentWord >= object.writingCollection.length) {
            // Reset variables and clear container if all words are written
            object.currentWord = 0;
            object.currentIndex = -1;
            object.alreadyWritten = "";
            object.writingContainer.innerHTML = "";
            object.direction = "right";
        } else if (object.direction == "right") {
            object.writeRight();
        } else if (object.direction == "left") {
            object.writeLeft();
        }
    }

    /**
     * Writes text from left to right in the writing container.
     */
    writeRight() {
        this.alreadyWritten = this.writingCollection[this.currentWord].slice(0, this.currentIndex + 1);
        this.writingContainer.textContent = this.alreadyWritten;
        this.currentIndex += 1;
    }

    /**
     * Writes text from right to left in the writing container.
     */
    writeLeft() {
        this.alreadyWritten = this.writingCollection[this.currentWord].slice(0, this.currentIndex + 1);
        this.writingContainer.textContent = this.alreadyWritten;
        this.currentIndex -= 1;
    }

    /**
     * Checks current index and changes direction of writing if necessary.
     */
    checkIndex() {
        if (this.currentIndex < 0 && this.direction == "left") {
            // Move to next word if reaching beginning of current word in left direction
            this.currentIndex = 0;
            this.currentWord = this.currentWord + 1;
            this.direction = "right";
        } else if (this.currentIndex >= this.writingCollection[this.currentWord].length && this.direction == "right") {
            // Reverse direction and add delay when reaching end of current word in right direction
            this.currentIndex = this.writingCollection[this.currentWord].length - 1;
            this.direction = "left";
            this.delay(20000); // 20,000 loops delay
        }
    }

    /**
     * Delays execution using nested loops (intended for demonstration purposes).
     * 
     * @param {number} loops - Number of loops to delay.
     */
    delay(loops) {
        for (let _ = 0; _ <= loops; _++) {
            for (let _ = 0; _ <= loops; _++) {
                // Nested loops for delay
            }
        }
    }
}
