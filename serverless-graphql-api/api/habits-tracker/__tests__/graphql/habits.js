// We use these fields in every query / mutation below.
const ERROR_FIELDS = /* GraphQL */ `
    {
        code
        message
        data
    }
`;

// A basic create "Habit" mutation.
export const CREATE_HABIT = /* GraphQL */ `
    mutation CreateHabit($data: HabitInput!) {
        habits {
            createHabit(data: $data) {
                data {
                    id
                    title
                    description
                    habitScore
                }
                error ${ERROR_FIELDS}
            }
        }
    }
`;

// A basic list "Habits" query.
export const LIST_HABITS = /* GraphQL */ `
    query ListHabits(
        $where: HabitListWhere
        $sort: HabitListSort
        $limit: Int
        $after: String
        $before: String
    ) {
        habits {
            listHabits(where: $where, sort: $sort, limit: $limit, after: $after, before: $before) {
                data {
                    id
                    title
                    description
                    habitScore
                }
                error ${ERROR_FIELDS}

            }
        }
    }
`;
