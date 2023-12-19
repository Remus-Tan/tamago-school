export default function Page() {
    const results = fetch(`https://swapi.dev/api/people`)
    .then((res) => res.json())

    return (
        <>
            hi
            [ results ]
        </>
    )
}