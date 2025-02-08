// 从 URL 获取 GIST_ID 和 GITHUB_TOKEN
const urlParams = new URLSearchParams(window.location.search);
const GIST_ID = urlParams.get('id');
const GITHUB_TOKEN = urlParams.get('token');
const GIST_API_URL = `https://api.github.com/gists/${GIST_ID}`

export const getGist = () =>
  new Promise(resolve => {
    return fetch(GIST_API_URL)
      .then(res => res.json())
      .then(data => {
        const content = JSON.parse(data.files['vitality.json'].content)
        resolve(content)
      })
      .catch(err => console.error('Error fetching Gist:', err))
  })

// 更新 Gist
export const updateGist = updatedTodos =>
  new Promise(resolve => {
    return fetch(GIST_API_URL, {
      method: 'PATCH',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: {
          'vitality.json': {
            content: JSON.stringify(updatedTodos, null, 2),
          },
        },
      }),
    })
      .then(() => resolve(updatedTodos))
      .catch(err => console.error('Error updating Gist:', err))
  })
