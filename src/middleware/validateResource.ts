import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

// the validateResource function returns another function
//We are going to call validateResource with our schema, and it will return another function and then this function is
//going to take req and res and next as arguments
const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      //if schema is parsed call next
      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validateResource;

// Explaination to the above code

// schema.parse({ ... });: This line calls the parse method of the schema object. In Zod, the parse method is used to validate and parse data according to the schema's rules.

// { body: req.body, query: req.query, params: req.params }: This part of the code creates an object containing the data to be validated. It includes the request body (req.body), query parameters (req.query), and route parameters (req.params). These are common parts of an HTTP request in Express.js.

// The structure of the object passed to schema.parse is designed to match the structure expected by the Zod schema. For example, if your Zod schema defines properties for the request body, query parameters, and route parameters, then you should provide an object with the same structure when calling schema.parse.

// When schema.parse is called with this object, Zod will validate each part of the request data against the corresponding schema defined in the Zod schema. If any part of the data doesn't conform to the schema's rules, Zod will throw an error.

// If all parts of the request data pass validation according to the Zod schema, the parse method will return an object with the validated data. This ensures that the request data meets the specified constraints before further processing in the application.

// Overall, this line of code is crucial for ensuring that incoming requests adhere to the expected format and constraints defined by the Zod schema, providing a robust mechanism for data validation and ensuring the integrity of the application's data.
