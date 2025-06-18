import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Paper, Button, Box, Stack, IconButton, Tooltip, Chip, Avatar, CircularProgress, Fade } from '@mui/material'
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions'
import BoltIcon from '@mui/icons-material/Bolt'
import CelebrationIcon from '@mui/icons-material/Celebration'
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon'
import './App.css'

const API_URL = 'https://meme-api.com/gimme'

function App() {
  const [count, setCount] = useState(0)
  const [meme, setMeme] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMeme = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(API_URL)
      const data = await res.json()
      setMeme(data)
    } catch (err) {
      setError('Failed to fetch meme! Try again.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch a meme on first load
  useEffect(() => {
    fetchMeme()
  }, [])

  const handleMeme = () => {
    fetchMeme()
    setCount((c) => c + 1)
  }

  return (
    <Box sx={{ 
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)', 
      minHeight: '100vh', 
      p: 0, 
      m: 0 
    }}>
      <AppBar position="static" sx={{ bgcolor: '#ff61a6', boxShadow: 4 }}>
        <Toolbar>
          <CatchingPokemonIcon fontSize="large" sx={{ mr: 2, color: '#fff700' }} />
          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 900, letterSpacing: 2, color: '#fff' }}>
            Meme Genie
          </Typography>
          <Tooltip title="Summon a new meme!">
            <IconButton color="inherit" onClick={handleMeme}>
              <BoltIcon sx={{ color: '#fff700' }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Stack alignItems="center" spacing={2} sx={{ mt: 3 }}>
        <Typography variant="h3" sx={{ 
          fontWeight: 900, 
          color: '#fff', 
          textAlign: 'center', 
          textShadow: '3px 3px #ff61a6',
          mb: 2,
          fontFamily: 'Comic Sans MS, Comic Sans, cursive'
        }}>
          How many can you go through without laughing? 😂
        </Typography>
        <Paper elevation={12} sx={{ p: 3, borderRadius: 6, bgcolor: '#fffbe7', minWidth: 300, maxWidth: 450, textAlign: 'center', border: '4px dashed #ff61a6', position: 'relative' }}>
          <Avatar sx={{ bgcolor: '#ff61a6', width: 60, height: 60, mb: 1, mx: 'auto', border: '4px solid #fff700', position: 'absolute', left: -30, top: -30 }}>
            <EmojiEmotionsIcon sx={{ fontSize: 40, color: '#fff700' }} />
          </Avatar>
          <Chip label={`Counter: ${count}`} color="secondary" icon={<CelebrationIcon />} sx={{ fontSize: 16, mb: 2, bgcolor: '#fff700', color: '#ff61a6', fontWeight: 700 }} />
          {loading ? (
            <Box sx={{ my: 3 }}>
              <CircularProgress size={50} sx={{ color: '#ff61a6' }} />
              <Typography variant="h6" sx={{ color: '#ff61a6', mt: 1 }}>
                Summoning meme magic...
              </Typography>
            </Box>
          ) : error ? (
            <Typography variant="h6" color="error" sx={{ my: 3 }}>{error}</Typography>
          ) : meme ? (
            <Fade in={!!meme}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff61a6', mb: 2, textShadow: '2px 2px #fff700' }}>
                  {meme.title}
                </Typography>
                <img
                  src={meme.url}
                  alt={meme.title}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '16px',
                    boxShadow: '0 0 24px 4px #ff61a6aa',
                    marginBottom: 12,
                    border: '4px solid #fff700',
                    background: '#fff',
                  }}
                />
                <Typography variant="body2" sx={{ color: '#888', fontStyle: 'italic', mb: 2 }}>
                  From: {meme.author} in r/{meme.subreddit}
                </Typography>
              </Box>
            </Fade>
          ) : null}
          <Button
            variant="contained"
            size="large"
            sx={{ bgcolor: '#ff61a6', color: '#fff700', fontWeight: 900, borderRadius: 8, boxShadow: 3, mt: 1, '&:hover': { bgcolor: '#fff700', color: '#ff61a6' } }}
            onClick={handleMeme}
            endIcon={<BoltIcon />}
          >
            Nxt Meme!
          </Button>
        </Paper>
      </Stack>
    </Box>
  )
}

export default App
