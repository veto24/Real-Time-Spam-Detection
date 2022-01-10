const fetchIsSpam = async (msg: string) => {
  try {
    const response = await fetch('http://localhost:5000/fetch_spam', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: msg,
      }),
    });
    const data = await response.json();
    return data.isSpam;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default fetchIsSpam;
