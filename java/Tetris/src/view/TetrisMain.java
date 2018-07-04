/*
 * Tetris Project
 */
package view;

import java.awt.EventQueue;



/**
 * 
 * Main Tetris program to be ran, calls gui.
 * @author Jacob Reed
 * @version May 19, 2017
 *
 */
public final class TetrisMain {
    
    /**
     * Prevents instantiation.
     */
    private TetrisMain() {
        throw new IllegalStateException();
    }
    /**
     * Main Method.
     * @param theArgs Command Line arguments.
     */
    public static void main(final String[] theArgs) {
        EventQueue.invokeLater(new Runnable() {
            @Override
            public void run() {
                new TetrisGUI().start();
            }
        });
    }
}
