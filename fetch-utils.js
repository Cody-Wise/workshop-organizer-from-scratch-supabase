const SUPABASE_URL = 'https://afgbmdkvqbvliaergujk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFmZ2JtZGt2cWJ2bGlhZXJndWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDc2Mzg2NTUsImV4cCI6MTk2MzIxNDY1NX0.VyU9_hrFWQ13GXnm_YwMxhGCqRVI1VMlopV5PCqYqYI';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getWorkshops(){

    const response = await client

        .from('workshops')
        .select('*, participants (*)');

    return response.body;

}

export async function createParticipant(name, workshop_id){

    const response = await client
        .from('participants')
        .insert({
            name: name,
            workshop_id: workshop_id
        });


    return response.body;

}

export async function getParticipants(someId){

    const response = await client
        .from('participants')
        .select('*')
        .match({ id: someId })
        .single();

    return response.body;


}

export async function deleteParticipant(id){
    const response = await client
        .from('participants')
        .delete()
        .match({ id: id });

    return response.body;
}

export function getUser() {
    return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./workshops');
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

// function checkError({ data, error }) {
//     return error ? console.error(error) : data;
// }
