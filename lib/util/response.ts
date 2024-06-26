import { ResponseObject } from "../types";

const props: (keyof Response)[] = [
    "ok",
    "status",
    "statusText",
    "url",
    "headers",
    "body",
    "bodyUsed",
    "type",
    "redirected",
    "clone",
    "formData",
    "json",
    "arrayBuffer",
    "blob",
    "text",
];

function toResponse(response: Response): ResponseObject {
    const _response = response.clone();

    return props.reduce(
        (obj, each) => ({ ...obj, [each]: _response[each] }),
        {} as ResponseObject
    );
}

export {
    toResponse
}