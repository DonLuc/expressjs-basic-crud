const express = require('express');
const router = express.Router();
const members = require('../../members');
const uuid = require('uuid');

//Get all members
router.get('/', (req, res) => res.json(members));

//Get single member
router.get('/:id', (req, res) => {
  const member = members.filter(
    (member) => member.id === parseInt(req.params.id)
  );
  // You can also use the .some function to check if the member exists or not
  if (member.length > 0) {
    res.json(member);
  } else {
    res.status(404).json({ msg: 'Member not found' });
  }
});

//Create member
router.post('/', (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    status: req.body.status,
  };
  if (!newMember.name || !newMember.status) {
    return res.status(400).json({
      msg: 'Please include a name and status!',
    });
  }
  members.push(newMember);
  res.json(members);
});

//Update member
router.put('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  console.log('IN: ' + req.body.name);
  if (found) {
    var updatedMember = {};
    members.forEach((member) => {
      console.log('TO UPDATE MEMBER: ' + JSON.stringify(member));
      if (member.id === parseInt(req.params.id)) {
        member.name = req.body.name ? req.body.name : member.name;
        member.status = req.body.status ? req.body.status : member.status;
        console.log('UPDATED MEMBER: ' + JSON.stringify(member));
        updatedMember = member;
      }
    });
    return res.json(updatedMember);
  }
  res.status(400).json({
    msg: 'Member does not exist or you have not included the required fields',
  });
});

//Delete member
router.delete('/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    const newMembersList = members.filter(
      (member) => member.id === parseInt(req.body.id)
    );
    console.log('CHECK HERE: ' + JSON.stringify(newMembersList));
    return res.json(newMembersList);
  }
  res.status(404).json({ msg: 'Member not found' });
});

module.exports = router;
