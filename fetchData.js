const fs = require('fs')
const path = require('path')
const axios = require('axios')

async function checkInstance (file) {
  fs.readFile(path.join(file), 'utf-8', (e, data) => {
    if (e) {
      console.error('error!', e)
    } else {
      const instance = JSON.parse(data)
      axios.get(`https://api.index.community/api//instances/${instance.uri}`).then(function (response) {
        console.log(instance.uri)
        console.log(instance.users.total)
        console.log(response.data.userCount)
        console.log('====================')
        console.log(instance.short_description)
        console.log('--------------------')
        console.log(response.data.description)
        console.log('====================')
        if (response.data.userCount !== undefined && response.data.userCount !== null) {
          console.log('updating!')
          instance.users.total = response.data.userCount
        }
        fs.writeFile(file, JSON.stringify(instance, null, 4), (err) => {
          if (err) {
            console.error(`Error writing file: ${err}`)
          }
        })
      })
    }
  })
}

async function checkGroup (file) {
  fs.readFile(path.join(file), 'utf-8', (e, data) => {
    if (e) {
      console.error('error!', e)
    } else {
      const instance = JSON.parse(data)
      axios.get(`https://${instance.uri}`, { headers: { Accept: 'application/activity+json' } }).then(function (response) {
        axios.get(response.data.followers, { headers: { Accept: 'application/activity+json' } }).then(function (followers) {
          // console.log(response)
          console.log(instance.uri)
          console.log(instance.members)
          console.log(followers.data.totalItems)
          if (followers.data.totalItems !== undefined && followers.data.totalItems !== null) {
            console.log('updating!')
            instance.members = followers.data.totalItems
          }
          fs.writeFile(file, JSON.stringify(instance, null, 4), (err) => {
            if (err) {
              console.error(`Error writing file: ${err}`)
            }
          })
        }).catch(function (error) {
          console.log('failed to get followers', error)
        })
      }).catch(function (error) {
        console.log('failed to get group', error)
      })
    }
  })
}

async function iterateOverInstances () {
  try {
    const files = await fs.promises.readdir('src/data/instances')
    for (const file of files) {
      checkInstance(path.join('src/data/instances', file))
    }
  } catch (e) {
    console.error('error!', e)
  }
}

async function iterateOverGroups () {
  try {
    const files = await fs.promises.readdir('src/data/groups')
    for (const file of files) {
      checkGroup(path.join('src/data/groups', file))
    }
  } catch (e) {
    console.error('error!', e)
  }
}

iterateOverInstances()

iterateOverGroups()
