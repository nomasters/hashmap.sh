import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/lab/Slider';
import Typography from '@material-ui/core/Typography';

interface Props {
  classes: {
    paper: string,
    paperHeader: string,
    slider: string,
  },
  handleTTLChange: (event: any, ttlSliderValue: any) => void
}

// ttlSeconds correlates to the SliderValue for index
const ttlSeconds = [
  15, 
  30, 
  60, 
  900, 
  1800, 
  3600,
  7200,
];
// ttlReadable correlates to the SliderValue for index
const ttlReadable = [
  '15 seconds',
  '30 seconds',
  '1 minutes',
  '15 minutes',
  '30 minutes',
  '1 hour',
  '2 hours',
];
class SetTTLForm extends React.Component<Props> {
  state = {
    ttlSliderValue: 3,
    ttlDisplayValue: ttlReadable[3],
  };

  handleTTLChange = (event:React.ChangeEvent, ttlSliderValue: number) => {
    this.setState({ 
      ttlSliderValue: ttlSliderValue,
      ttl: ttlSeconds[ttlSliderValue],
      ttlDisplayValue: ttlReadable[ttlSliderValue],
    });
    const ttlValue = ttlSeconds[ttlSliderValue];
    this.props.handleTTLChange(event, ttlValue);
  }
  render() {
    const { ttlSliderValue, ttlDisplayValue } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Paper className={classes.paper}>
          <div className={classes.paperHeader}>
            <Typography gutterBottom variant="headline" component="h2">
              Set a TTL
            </Typography>                  
            <Typography gutterBottom variant="subheading" component="h3" color='textSecondary'>
              Key-value pairs on hashmap server are ephemeral. A submitted payload allows a TTL expressed in seconds with a value between 0 and 604800 (one week). This playground allows values between 15 seconds and two hours. 
            </Typography>
          </div>
          <div className={classes.slider}>
            <Typography gutterBottom variant="subheading" component="p">
              ttl: {ttlDisplayValue}
            </Typography>
            <Slider value={ttlSliderValue} min={0} max={6} step={1} onChange={this.handleTTLChange}/>
          </div>
        </Paper>
      </>
    );
  }
} 

export default SetTTLForm;