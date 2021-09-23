import { PeopleOutlined } from '@mui/icons-material'
import { Box, Card, CardActionArea, CardContent, CardMedia, Container, Link, Typography } from '@mui/material'
import { styled } from '@mui/styles'
import React from 'react'
import ImageLoader from './ImageLoader'

const getPlural = (number, one, few, many) => {
  const plurals = new Intl.PluralRules('ru-RU')
  switch (plurals.select(number)) {
    case 'one':
      return one
    case 'few':
      return few
    case 'many':
      return many
    default:
      return many
  }
}

const Stat = styled('div')({
  display: 'flex'
})

export default function GroupCard ({ instance }) {
  return (
    <Link href={'https://' + instance.uri} target='_blank' rel='noreferrer' underline='none'>
      <Card sx={{
        display: 'flex',
        flexDirection: 'column'
      }}
      >
        <CardActionArea>

          <Container style={{
            display: 'flex',
            alignItems: 'center',
            padding: 16
          }}
          >

            <div style={{ flex: '1 1 auto' }}>
              <Typography variant='overline' style={{ lineHeight: 1.66 }}>{instance.handle}</Typography>
              <Typography variant='h6'>{instance.title}</Typography>
            </div>
            {instance.icon &&
              <Box width='3em' borderRadius={1} overflow='hidden'>
                <ImageLoader imgName={instance.icon} />
              </Box>}
          </Container>
          {instance.thumbnail &&
            <CardMedia style={{ height: 150 }}>
              <ImageLoader imgName={instance.thumbnail} />
            </CardMedia>}
          <CardContent style={{
            background: '#434B5E',
            flexGrow: 2
          }}
          >
            <Typography variant='body2' color='textSecondary' component='p'>
              {instance.short_description || ''}
            </Typography>
          </CardContent>
          <Container style={{
            padding: 16,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly'
          }}
          >
            <Stat>
              {instance.members
                ? <>
                  <PeopleOutlined />
                  <Typography style={{ paddingLeft: 4 }} variant='subtitle1' color='textSecondary' component='p'>
                    {instance.members} {getPlural(instance.members, 'подписчик', 'подписчика', 'подписчиков')}
                  </Typography>
                </>
                : <Typography style={{ paddingLeft: 4 }} variant='subtitle1' color='textSecondary' component='p'>
                  Подписчики скрыты
                  </Typography>}
            </Stat>
          </Container>
        </CardActionArea>
      </Card>
    </Link>
  )
}
