User.find({}, function(err, users) {
    if (err) throw err;
    console.log(users);
});

User.find({ username: 'pelanmar1@gmail.com' }, function(err, user) {
    if (err) throw err;
    console.log(user);
});

User.findById('59963d1a1a4a774093d617d1', function(err, user) {
    if (err) throw err;
    console.log(user);
});

var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() - 1);

User.find({ admin: true }).where('created_at').gt(monthAgo).exec(function(err, users) {
  if (err) throw err;
  console.log(users);
});


User.findById(1, function(err, user) {
  if (err) throw err;
  user.location = 'uk';
  user.save(function(err) {
    if (err) throw err;
    console.log('User successfully updated!');
  });
});

User.findOneAndUpdate({ username: 'starlord55' }, { username: 'starlord88' }, function(err, user) {
  if (err) throw err;
  console.log(user);
});

User.findByIdAndUpdate(4, { username: 'starlord88' }, function(err, user) {
  if (err) throw err;

  console.log(user);
});

User.find({ username: 'starlord55' }, function(err, user) {
  if (err) throw err;
  user.remove(function(err) {
    if (err) throw err;

    console.log('User successfully deleted!');
  });
});
User.findOneAndRemove({ username: 'starlord55' }, function(err) {
  if (err) throw err;
  console.log('User deleted!');
});

User.findByIdAndRemove(4, function(err) {
  if (err) throw err;
  console.log('User deleted!');
});

