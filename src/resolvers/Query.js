function feed(parent, args, context, info) {
  return context.prisma.links()
}


// getLink: (parent, args, context, info) => {
    //   let link = null
    //   let links = context.prisma.links()
    //   console.log(links)
    //   // links.map(node => {
    //   //   if (node.id === args.id){
    //   //     link = node
    //   //   }
    //   // })
    //   // if (!link){
    //   //   return `link-${args.id} does not exist`
    //   // } else {
    //   //   return link
    //   // }
    // }
    
module.exports = {
  feed,
}