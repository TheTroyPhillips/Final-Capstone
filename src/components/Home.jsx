

export default function Home({ token, userData }) {
    return (
      <>
        {token ? (
          <h1 className="page-title">Hello User!</h1>
        ) : (
          <h1 className="page-title">Hello Guest!</h1>
        )}
      </>
    );
  }