# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. Create relational table in db for internal and custom agent ids

    - Acceptance criteria
        - Table should be called `agent_relational`
        - Table should appear as follows:

            | name              | type                      | unique         |  optional     |
            | -------------     | --------                  | -----------    | ------------- |
            | id                | id                        | yes            | no            |
            | internal_agent_id | int (key to agents table) | yes            | no            |
            custom_agent_id     | int                       | yes            | no            |


    - Time/effort
        - 30 min
        - Low

    - Implementation
        - Utilize PostgreSQL admin interface to add table using [`CREATE TABLE`](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-create-table/) syntax
        - Added note
            - Assuming internal db id for agents is unique regardless of facilities, this should be ok. If not, `facility_id` will need to be added to the table with a `CONSTRAINT` on `facility_id` and `custom_agent_id`.

2. Set up API with CRUD functionality to interact with `agent_relational` table

    - Acceptance criteria
        - Should be able to Create, Read, Update, Delete
        - Should utilize existing API framework
        - Endpoint should follow best practices (e.g. `/custom_agents`)

    - Time/effort
        - 1-3 hr (depending on framework)
        - Medium

    - Implementation
        - Develop CRUD queries for `agent_relational` (as needed (for FastAPI, for example))
        - Develop CRUD routers/views for `agent_relational` (as needed (for FastAPI, Django, for example))
        - Test using Insomnia/Postman or framework's built-in interface
            - Get list of `agent_relational`
            - Perform CRUD hits
            - Get list of `agent_relational` and compare to start


3. Add UI to permit facilities to add custom agent id

    - Acceptance criteria
        - Select field should be present on UI
            - Should contain unique identifier to agent that facilities would recognize (e.g. first/last name combo)
        - Input field should be next to select field
            - To allow input of new `custom_agent_id`
        - Button to submit `custom_agent_id`
            - On click, button should POST to `agent_relational` API endpoint (namely, `/custom_agents`, as suggested above) to create row in table

    - Time/effort
        - 1 hr (assuming React)
        - Medium

    - Implementation
        - Add Select field which utilizes `useEffect()` (if using React hooks) to be pre-populated with agent data (see acceptance criteria) from the assumed `agents` table in the database
        - Have React state update on Input field updating with `updateField()` and `dispatch()`
        - Add  `onClick` functionality to button
            - On click, POST to `agent_relational` API endpoint with value from Select and Input fields
        - Test as previously described when setting up backend API (ensure db is being updated)
        - Note
            - Could break this ticket down into two tickets, as needed:
                - Set up frontend UI without integration with backend
                - Integrate with backend
