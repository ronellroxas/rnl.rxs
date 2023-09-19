export class TextValidator {
    private flags: VALIDATOR_FLAGS[] = [];
    private options: string[] | undefined;
    private constraints: TextConstraint[] = [];
    private failReasons: TextConstraint[] = [];
    
    addConstraint(flag: VALIDATOR_FLAGS, options: string[] | undefined = undefined) {
        if (flag == VALIDATOR_FLAGS.OPTIONS && options == undefined) {
            throw Error(`Flag "VALIDATOR_FLAGS.OPTIONS" requires you to pass a list of options`);
        }

        this.flags.push(flag);
        this.options = options;
    }

    private BuildConstraints() {
        this.flags.forEach(flag => {
            this.constraints.push(this.mapValidatorFlag(flag));
        });
    }

    private mapValidatorFlag(flag: VALIDATOR_FLAGS): TextConstraint {
        switch(flag) {
            case VALIDATOR_FLAGS.OPTIONS: {
                return new TextConstraintOptions(this.options!!);
            }
            case VALIDATOR_FLAGS.REQUIRED: {
                return new TextConstraintRequired();
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
        return text.length > this.max;
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
    OPTIONS
}
