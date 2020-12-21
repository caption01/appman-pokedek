### Nutchapon Hanouypornlert

### About app

- search pokemonCard by name & type by click searchIcon or press enter

#### FYI

as i do assignment i found something quiet small bug

1. api query name and type logic in

   ```
     cards: _.filter(cards, (card) => {
     const name = _.toUpper(_.get(req, "query.name", ""));
     const type = _.toUpper(_.get(req, "query.type", ""));
     const checkName = _.includes(_.toUpper(card.name), name);
     const checkType = _.includes(_.toUpper(card.type), type);
     return checkName && checkType;
   }),
   ```

   i decide to change && to || in return line

   ```
    return checkName && checkType -> return checkName || checkType;
   ```

   PS. Sorry if i was incorrect.

#### Time-Tracking

// 0-30 min
[x] procrees 1 -> read question, setup app.
// commit [1][2]

// break on lunch

// 2 hr
[x] process 2 -> build front end component.
// commit [3]

// break to outside

// 1 hr
[x] process 3 -> connect with api and final style app.
// commit [4][5]

#### total time estimate = 3.30hr.
