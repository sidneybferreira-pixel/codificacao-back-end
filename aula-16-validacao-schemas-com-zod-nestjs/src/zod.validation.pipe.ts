import { PipeTransform,
         ArgumentMetadata,
         BadGatewayException } from "@nestjs/common";
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: z.ZodType ) {}
    transform(value: any, metadata: ArgumentMetadata) {

        if(metadata.type !== 'body') return value;
        const perseResult = this.schema.safeParse(value);
        if(!perseResult.success){
            const formatedErrors = perseResult.error.issues.map((issue) =>({
                campo: issue.path.join('.'),
                mensagem: issue.message,
            }));
            throw new BadGatewayException({
                stausCode: 400,
                erros: formatedErrors,
            });
        }
        return perseResult.data;
    }
}