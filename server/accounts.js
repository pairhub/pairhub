Accounts.onCreateUser((options, user) => {
    const accessToken = user.services.github.accessToken;

    const result = Meteor.http.get('https://api.github.com/user', {
      params: { access_token: accessToken },
      headers: { "User-Agent": "Meteor/1.0" }
    });

    if (result.error) {
        console.log(result);
        throw result.error;
    }

    const profile = {
      'name': result.data.name,
      'avatar_url': result.data.avatar_url,
      'company': result.data.company,
      'blog': result.data.blog,
      'location': result.data.location,
      'bio': result.data.bio,
      'html_url': result.data.html_url
    }

    user.profile = profile;

    return user;
});
