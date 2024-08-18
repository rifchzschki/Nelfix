import { createParamDecorator, ExecutionContext } from'@nestjs/common';

export const Layout = createParamDecorator(
  (layout: string, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    response.locals.layout = layout;
    return layout;
  },
);
