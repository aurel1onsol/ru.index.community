import { Box, Card, CardActionArea, CardHeader, Container, Grid, Typography } from '@mui/material'
import RuFediLogo from '../svg/ru-fedi'
import React from 'react'
import { styled } from '@mui/styles'
import Link from '../components/Link'
import DnsOutlined from '@mui/icons-material/DnsOutlined'
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined'

const LogoWrapper = styled('div')({
  height: 96
})

export default function Communities ({ data }) {
  return (
    <Box pt={8}>
      <Container maxWidth='sm'>
        <Grid container spacing={3} justify='space-around'>
          <Grid item xs={12}>
            <LogoWrapper>
              <RuFediLogo />
            </LogoWrapper>
          </Grid>
          <Grid item xs={12}>
            <Link to='/communities' color='inherit' underline='none'>
              <Card variant='outlined'>
                <CardActionArea>
                  <CardHeader
                    avatar={<DnsOutlined fontSize='large' />}
                    title='Сервера'
                    subheader='Каталог серверов русскоязычного созвездия федивёрса'
                  />
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Link to='/groups' color='inherit' underline='none'>
              <Card variant='outlined'>
                <CardActionArea>
                  <CardHeader
                    avatar={<GroupsOutlinedIcon fontSize='large' />}
                    title='Группы'
                    subheader='Каталог русскоязычных групп'
                  />
                </CardActionArea>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12}>
            <Typography textAlign='center'>
              Index.Community — проект <Link color='secondary' href='https://innereq.org' target='_blank' rel='noreferrer'>innereq.org</Link>.
            </Typography>
            <Typography textAlign='center'>
              Оставить отзыв или дополнить каталог можно на нашем <Link color='secondary' href='https://github.com/innereq/ru.index.community' target='_blank' rel='noreferrer'>гитхабе</Link>.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
