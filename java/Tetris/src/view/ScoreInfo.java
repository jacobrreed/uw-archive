/*
 * Tetris Project
 */
package view;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.util.Observable;
import java.util.Observer;
import javax.swing.JPanel;
import model.TetrisPiece;

/**
 * 
 * Panel that shows next piece in line.
 * @author Jacob Reed
 * @version May 19, 2017
 *
 */
public class ScoreInfo extends JPanel implements Observer {

    /**Generated SUID. */
    private static final long serialVersionUID = -904014731331910425L;
    /** BG COLOR. */
    private static final Color BG = new Color(114, 10, 10);
    /** Dimension of panel. */
    private static final Dimension PANE_SIZE = new Dimension(200, 100);
    /** Font. */
    private static final Font FONT = new Font("Cracked", Font.BOLD, 14);
    /** Number of lines per level. */
    private static final int LINES_PER_LEVEL = 5;
    /** 1 Line Modifier. */
    private static final int ONE_LINE = 40;
    /** 2 Line Modifier. */
    private static final int TWO_LINE = 100;
    /** 3 Line Modifier. */
    private static final int THREE_LINE = 300;
    /** 4 Line Modifier. */
    private static final int FOUR_LINE = 1200;
    /** 3 Lines Cleared Case. */
    private static final int THREE = 3;
    /** 4 Lines Cleared Case. */
    private static final int FOUR = 4;
    /** Score. */
    private int myScore;
    /** Current Level. */
    private int myCurrentLevel;
    /** Lines Cleared per update. */
    private Integer[] myLinesCleared;
    /** Current Lines until next level for display. */
    private int myLinesToNextDisplayValue;
    /** Lines Cleared Total entire game. */
    private int myLinesClearedTotal;
    /**Current lines cleared this level.    */
    private int myLinesClearedThisLevel;
    /**frozen blocks counter. */
    private int myFrozen;

    
    /**
     * Constructor.
     */
    public ScoreInfo() {
        super();
        setBackground(BG);
        setPreferredSize(PANE_SIZE);
        //Set Score
        myScore = 0;
        //Set Level
        myCurrentLevel = 1;
        //Init lines cleared
        myLinesClearedTotal = 0;
        myLinesToNextDisplayValue = LINES_PER_LEVEL;
        myLinesClearedThisLevel = 0;
        myFrozen = 0;
    }
    
    /**
     * Getter for current level.
     * @return int for level.
     */
    protected int getLevel() {
        return myCurrentLevel;
    }
    
    /**
     * Sets level.
     * @param theLevel int for level
     */
    protected void setLevel(final int theLevel) {
        myCurrentLevel = theLevel;
        repaint();
    }
    
    @Override
    protected void paintComponent(final Graphics theGraphics) {
        super.paintComponent(theGraphics);
        final Graphics2D g2d = (Graphics2D) theGraphics;
        g2d.setColor(Color.BLACK);
        g2d.setFont(FONT);
        final int scoreX = 10;
        final int scoreY = 25;
        final int levelX = 10;
        final int levelY = 45;
        final int xMod = 170;
        final int linesX = 10;
        final int linesY = 65;
        final int linesToNextY = 85;
        final StringBuilder scoreVal = new StringBuilder();
        scoreVal.append(myScore);
        final StringBuilder levelVal = new StringBuilder();
        levelVal.append(myCurrentLevel);
        final StringBuilder linesVal = new StringBuilder();
        linesVal.append(myLinesClearedTotal);
        final StringBuilder linesToNext = new StringBuilder();
        linesToNext.append(myLinesToNextDisplayValue);
        g2d.drawString("Score: ", scoreX, scoreY);
        g2d.drawString("Level: ", levelX, levelY);
        g2d.drawString("Lines Cleared:", linesX, linesY);
        g2d.drawString("Lines until next:", scoreX, linesToNextY);
        g2d.drawString(scoreVal.toString(), xMod, scoreY);
        g2d.drawString(levelVal.toString(), xMod, levelY);
        g2d.drawString(linesVal.toString(), xMod, linesY);
        g2d.drawString(linesToNext.toString(), xMod, linesToNextY);
    }
    
    /**
     * Refreshes info about score and level.
     */
    private void refreshInfo() {
        //Add number of lines cleared to total
        myLinesClearedTotal += myLinesCleared.length;
        /*
         * Calculate score to add on to current score based on current level.
         * Calculate level based on lines just cleared, change myLinesToNext
         */
        //SCORE CALCULATION
        int tempScore = 0;
        switch (myLinesCleared.length) {
            case 1 : tempScore = ONE_LINE * myCurrentLevel;
                break;
            case 2 : tempScore = TWO_LINE * myCurrentLevel;
                break;
            case THREE : tempScore = THREE_LINE * myCurrentLevel;
                break;
            case FOUR : tempScore = FOUR_LINE * myCurrentLevel;
                break;
            default:
                break;
        }
        myScore += tempScore;
        
        //Calculate level and change lines until next
        
        //If my current lines to next is greater than or equal to the amount needed tp
        //level, level, then reset the lines until next to correct value
        //else add lines to next.
        if (myLinesClearedThisLevel + myLinesCleared.length >= LINES_PER_LEVEL) {
            myCurrentLevel++;
            //Takes current value + new cleared gets the remainder based on lines per level, 
            myLinesClearedThisLevel = (myLinesClearedThisLevel 
                            + myLinesCleared.length) % LINES_PER_LEVEL;
            myLinesToNextDisplayValue = LINES_PER_LEVEL - myLinesClearedThisLevel;
        } else {
            myLinesClearedThisLevel += myLinesCleared.length;
            myLinesToNextDisplayValue -= myLinesCleared.length;
        }
        
        repaint();
    }
    
    /**
     * Resets lines cleared total.
     */
    protected void newGameReset() {
        myLinesClearedTotal = 0;
        myLinesToNextDisplayValue = LINES_PER_LEVEL;
        myLinesClearedThisLevel = 0;
        myScore = 0;
        myCurrentLevel = 1;
        myFrozen = 0;
        repaint();
    }
    
    @Override
    public void update(final Observable theOb, final Object theObject) {
        if (theObject instanceof Integer[]) {
            //Elements of array are the row numbers of cleared lines. - not needed
            //Size of array is the number of lines cleared at once
            myLinesCleared = (Integer[]) theObject;
            refreshInfo();
        }
        if (theObject instanceof TetrisPiece) {
            if (myFrozen >= 0) {
                myScore += FOUR;
                repaint();
            } else {
                myFrozen++;
            }
        }
    }

}