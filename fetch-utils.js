const SUPABASE_URL = 'https://kdukidihcdlbgresawun.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkdWtpZGloY2RsYmdyZXNhd3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQzNDE0NDYsImV4cCI6MTk1OTkxNzQ0Nn0.YtwzCCX2zDt5IzpJ-Uh5Hy4DsanDjeq6lfG72ezSCW4';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./other-page');
    }
}

export async function signupUser(email, password) {
    const response = await client.auth.signUp({ email, password });

    return response.user;
}

export async function signInUser(email, password) {
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return (window.location.href = '../');
}

export async function getWorkshops(){
    const resp = await client.from('workshops').select('*,people (*)').match({ 'people.user_id' : client.auth.session().user.id });
    return checkError(resp);
}

export async function deletePartaker(id) {
    const resp = await client.from('people').delete().match({ id: id }).single();

    return checkError(resp);
}

export async function createPartaker(people) {
    const resp = await client.from('people').insert(people);

    return checkError(resp);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
