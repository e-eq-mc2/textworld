const { spawn } = require('child_process')
const Command = require('./lib/command.js')

class Top extends Command {
  constructor(cmd = 'top', opt = ['-l', '0', '-s', '1', '-n', '65', '-stats', 'pid,command,cpu,time,ports,mem,pgrp,state,cpu_me,faults,cow,msgsent,msgrecv,cpu_others,pageins,sysbsd,csw,uid,threads,sysmach,boosts']) {
    super(cmd, opt)
  }

  spawn(callback) {
    let res = ''

    super.spawn((chunk) => {
      const stdout = chunk.toString()
      res += stdout

      const mo = res.match(/^(Processes: [\s\S]*?)(Processes: [\s\S]*)/)
      if ( mo ) {
        const blk = mo[1]
        const lines = blk.split(/\n/g)
        callback(lines)
        res = mo[2]
      } 

    })
  }
}

module.exports = Top
