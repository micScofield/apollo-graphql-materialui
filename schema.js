// const axios = require("axios");

// const {
//   GraphQLObjectType,
//   GraphQLInt,
//   GraphQLString,
//   GraphQLBoolean,
//   GraphQLList,
//   GraphQLSchema,
// } = require("graphql");

// // Create Object types for all types of queries. In our case launch and rocket and specify fields

// // Launch Type
// const LaunchType = new GraphQLObjectType({
//   name: "Launch",
//   fields: () => ({
//     flight_number: { type: GraphQLInt },
//     mission_name: { type: GraphQLString },
//     launch_year: { type: GraphQLString },
//     launch_date_local: { type: GraphQLString },
//     launch_success: { type: GraphQLBoolean },
//     rocket: { type: RocketType },
//     links: { type: LinkType },
//     details: { type: GraphQLString }
//   }),
// });

// // Rocket Type
// const RocketType = new GraphQLObjectType({
//   name: "Rocket",
//   fields: () => ({
//     rocket_id: { type: GraphQLString },
//     rocket_name: { type: GraphQLString },
//     rocket_type: { type: GraphQLString },
//   }),
// });

// // Link Type
// const LinkType = new GraphQLObjectType({
//   name: "Link",
//   fields: () => ({
//     video_link: { type: GraphQLString },
//     wikipedia: { type: GraphQLString }
//   })
// })

// // Specify all queries which our endpoint will support

// // Root Query
// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     launches: {
//       type: new GraphQLList(LaunchType), // because we are getting an array of launches, use list

//       resolve(parent, args) {
//         return axios
//           .get("https://api.spacexdata.com/v3/launches")
//           .then((res) => res.data);
//       },
//     },
//     launch: {
//       type: LaunchType,
//       args: {
//         flight_number: { type: GraphQLInt },
//       },
//       resolve(parent, args) {
//         return axios
//           .get(`https://api.spacexdata.com/v3/launches/${args.flight_number}`)
//           .then((res) => {
//             console.log(res.data)
//             return res.data
//           });
//       },
//     },
//     rockets: {
//       type: new GraphQLList(RocketType),
//       resolve(parent, args) {
//         return axios
//           .get("https://api.spacexdata.com/v3/rockets")
//           .then((res) => res.data);
//       },
//     },
//     rocket: {
//       type: RocketType,
//       args: {
//         id: { type: GraphQLInt },
//       },
//       resolve(parent, args) {
//         return axios
//           .get(`https://api.spacexdata.com/v3/rockets/${args.id}`)
//           .then((res) => res.data);
//       },
//     },
//   },
// });

// // build a schema and export
// module.exports = new GraphQLSchema({
//   query: RootQuery,
// });
