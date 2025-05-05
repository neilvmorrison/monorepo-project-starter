#!/bin/bash

# Check if resource name is provided
if [ -z "$1" ]; then
    echo "Please provide a resource name (e.g. ./setup-resource.sh users)"
    exit 1
fi

# Variables
RESOURCE_NAME="$1"

# Define the resource path
RESOURCE_PATH="src/resources/$RESOURCE_NAME"
RESOURCE_NAME_PASCAL=$(echo "$RESOURCE_NAME" | awk -F'_' '{
    result = "";
    for (i = 1; i <= NF; i++) {
        first = toupper(substr($i, 1, 1));
        rest = substr($i, 2);
        result = result first rest;
    }
    print result;
}')


# Determine the singular form of the PascalCase name
RESOURCE_NAME_SINGULAR="${RESOURCE_NAME_PASCAL}"
if [[ "$RESOURCE_NAME_PASCAL" =~ [^aeiou]ies$ ]]; then
    RESOURCE_NAME_SINGULAR="${RESOURCE_NAME_PASCAL%ies}y"
elif [[ "$RESOURCE_NAME_PASCAL" =~ sses$ ]]; then
    RESOURCE_NAME_SINGULAR="${RESOURCE_NAME_PASCAL%es}"
elif [[ "$RESOURCE_NAME_PASCAL" =~ [^s]s$ ]]; then
    RESOURCE_NAME_SINGULAR="${RESOURCE_NAME_PASCAL%s}"
fi

# Create directory structure
mkdir -p "$RESOURCE_PATH/tests"

# Create service file
cat << EOF > "$RESOURCE_PATH/$RESOURCE_NAME.service.ts"
import { Pool } from "pg";
import DatabaseService from "../../db/db.service";

export class ${RESOURCE_NAME_PASCAL}Service extends DatabaseService<"${RESOURCE_NAME}"> {
  constructor(db: Pool) {
    super(db, "${RESOURCE_NAME}");
  }
}
EOF

# Create routes file
cat << EOF > "$RESOURCE_PATH/$RESOURCE_NAME.routes.ts"
import Router from "@koa/router";
import { Context } from "koa";
import db from "../../db/client";
import { ${RESOURCE_NAME_PASCAL}Service } from "./${RESOURCE_NAME}.service";
import { Insert${RESOURCE_NAME_SINGULAR}, Update${RESOURCE_NAME_SINGULAR} } from "shared/types";

const ${RESOURCE_NAME}_router = new Router({ prefix: "/${RESOURCE_NAME}" });
const ${RESOURCE_NAME}_service = new ${RESOURCE_NAME_PASCAL}Service(db);

${RESOURCE_NAME}_router.get("/", async (ctx: Context) => {
  const result = await ${RESOURCE_NAME}_service.findMany();
  ctx.body = result;
});

${RESOURCE_NAME}_router.get("/:id", async (ctx: Context) => {
  const id = ctx.params.id;
  const result = await ${RESOURCE_NAME}_service.findFirst(id);
  ctx.body = result;
});

${RESOURCE_NAME}_router.post("/", async (ctx: Context) => {
  const body = ctx.request.body as Insert${RESOURCE_NAME_SINGULAR};
  const result = await ${RESOURCE_NAME}_service.create(body);
  ctx.body = result;
});

${RESOURCE_NAME}_router.patch("/:id", async (ctx: Context) => {
  const id = ctx.params.id;
  const body = ctx.request.body as Update${RESOURCE_NAME_SINGULAR};
  const result = await ${RESOURCE_NAME}_service.update(id, body);
  ctx.body = result;
});

${RESOURCE_NAME}_router.delete("/:id", async (ctx: Context) => {
  const id = ctx.params.id;
  await ${RESOURCE_NAME}_service._delete(id);
  ctx.status = 204;
});

export default ${RESOURCE_NAME}_router;
EOF

# Update router/index.ts
ROUTER_FILE="src/router/index.ts"
IMPORT_LINE="import ${RESOURCE_NAME}_router from \"../resources/${RESOURCE_NAME}/${RESOURCE_NAME}.routes\";"
USE_LINE="router.use(${RESOURCE_NAME}_router.routes());"

# Add import statement before the router declaration
sed -i '' -e "/const router = new Router/i\\
$IMPORT_LINE" "$ROUTER_FILE"

# Add router.use() statement before the export
sed -i '' -e "/export default router/i\\
$USE_LINE" "$ROUTER_FILE"

# Create service test file
cat << EOF > "$RESOURCE_PATH/tests/service.test.ts"
import { ${RESOURCE_NAME_CAPITAL}Service } from "../${RESOURCE_NAME}.service";
import { db } from "../../../db/client";

describe("${RESOURCE_NAME_CAPITAL}Service", () => {
  let service: ${RESOURCE_NAME_CAPITAL}Service;

  beforeEach(() => {
    service = new ${RESOURCE_NAME_CAPITAL}Service(db);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
EOF

echo "Resource '${RESOURCE_NAME}' structure created successfully!"