export type TextValidatorExtras = {
    options: string[] | undefined
    max: number | undefined
}

export class TextValidator {
    private flags: VALIDATOR_FLAGS[] = [];
    private constraints: TextConstraint[] = [];
    private failReasons: TextConstraint[] = [];
    private extras: TextValidatorExtras = {
        options: undefined,
        max: undefined
    }

    addConstraints(flags: VALIDATOR_FLAGS[], extras: TextValidatorExtras) {
        if (flags.includes(VALIDATOR_FLAGS.OPTIONS) && 
            (extras.options == undefined || extras.options == null)) {
                throw Error(`Flag "VALIDATOR_FLAGS.OPTIONS requires a "option" extra data.`);
        }
        if (flags.includes(VALIDATOR_FLAGS.MAX_CHARS) && 
            (extras.max == undefined || extras.max == null)) {
                throw Error(`Flag "VALIDATOR_FLAGS.MAX_CHARS requires a "max" extra data.`);
        }

        this.flags = flags;
        this.extras = extras;
    }

    private BuildConstraints() {
        this.flags.forEach(flag => {
            this.constraints.push(this.mapValidatorFlag(flag));
        });
    }

    private mapValidatorFlag(flag: VALIDATOR_FLAGS): TextConstraint {
        switch(flag) {
            case VALIDATOR_FLAGS.OPTIONS: {
                return new TextConstraintOptions(this.extras.options!!);
            }
            case VALIDATOR_FLAGS.REQUIRED: {
                return new TextConstraintRequired();
            }
            case VALIDATOR_FLAGS.MAX_CHARS: {
                return new TextConstraintMaxLength(this.extras.max!!);
            }
        }
    }

    isValid(text: string): boolean {
        this.failReasons = [];

        this.BuildConstraints();
        let success = true;
        this.constraints.forEach(constraint => {
            let validate = constraint.validate(text);
            success = validate && success;       

            if (!validate) this.failReasons.push(constraint)
        });

        this.logResults();
        
        return success;
    }

    private logResults() {
        const result = this.failReasons.length > 0 ? 
            `Failed at: ${this.failReasons.toString()}` : "All constraints were successful!";
        console.info(`Textvalidator finished! \n${result}`);
    }
}

abstract class TextConstraint {
    abstract validate(text: string): boolean;

    abstract toString(): string;
}


class TextConstraintRequired extends TextConstraint {
    validate(text: string): boolean {
        return text.length > 0;
    }

    toString(): string {
        return "TextConstraintRequired";
    }
}

class TextConstraintMaxLength extends TextConstraint {
    max: number;

    constructor(max: number) {
        super();
        this.max = max;
    }

    validate(text: string): boolean {
        return text.length <= this.max;
    }

    toString(): string {
        return "TextConstraintMaxLength";
    }
}

class TextConstraintOptions extends TextConstraint {
    options: string[];
    exactMatch: boolean;

    constructor(options: string[], exactMatch: boolean = false) {
        super();
        this.options = options;
        this.exactMatch = exactMatch;
    }

    validate(text: string): boolean {      
        const finalOptions = this.exactMatch ? this.options : this.options.map(o => o.toLowerCase());
        const finalText = this.exactMatch ? text : text.toLowerCase();  

        return finalOptions.filter(o => o == finalText).length > 0;
    }

    toString(): string {
        return "TextConstraintOptions";
    }
}

export enum VALIDATOR_FLAGS {
    REQUIRED,
    OPTIONS,
    MAX_CHARS
}
