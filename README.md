## Installation
- `pnpm install`

Lint and prettier commands are in package.json.
For a quick start run `pnpm run dev`

## Architecture.
Permissions are system wide. The authorization is done by verifying that you have permissionX under OrganizationY and that relationships is called and exposed as "role"
So who owns the permissions? the various services that will use this RBAC system. 
Each one can create its own permission and using our `canActivate(Permission)` middleware guard we can be sure that the user is authorized to do so.
The system also owns the standard roles and their permission sets, Which you can assign users to.

## Notes
- The lack of controllers is to to the fact that `ts-rest` handles all the supposed controller functions of "validating parameters" and handling different status codes.

- Using MikroOrm's Unit of Work semantics all database write operations happen implicitly within transactions and are flushed in a single roundtrip

- We are using *explicit* relationship tables instead of letting the ORM handle them implicitly. This is allows us to enforce composite unique constraints on -for example- unique[role+org+user]. We abstract this complexity away from service code by creating custom entity repositories.
