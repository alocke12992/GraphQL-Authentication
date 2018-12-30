const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {

  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password })
  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email })
  
  if (!user) {
    throw new Error("No such user found")
  }

  const valid = await bcrypt.compare(args.password, user.password)

  if (!valid) {
    throw new Error("Invalid password")
  }

  const token = jwt.sign({ userId: user.id}, APP_SECRET)

  return {
    token, 
    user
  }
}

function post(root, args, context, info) {
  const userId = getUserId(context)
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: {id: userId }}
  })
}

// updateLink: (parent, args) => {
    //   let updatedLink

    //   links.map((link, index) => {
    //     if (link.id === args.id) {
    //       if (args.description) {
    //         links[index].description = args.description
    //       }
    //       if (args.url) {
    //         links[index].url = args.url
    //       }
    //       updatedLink = links[index]
    //     }
    //   })
    //   return updatedLink
    // },
    // deleteLink: (parent,args) => {
    //   let deletedLink,
    //       indexToDelete

    //   links.map((link, index) => {
    //     if (link.id === args.id) {
    //       indexToDelete = index
    //     }
    //   })

    //   if (typeof indexToDelete !== "undefined"){
    //     deletedLink = links.splice(indexToDelete, 1)
    //   }

    //   if (deletedLink.length) {
    //     return deletedLink[0]
    //   }
    //   return
    // }

module.exports = {
  signup,
  login,
  post
}