package com.callingapp;

import com.facebook.react.ReactActivity;
import android.os.Bundle;
import com.codegulp.invokeapp.RNInvokeApp;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "CallingApp";
  }
  @Override
   protected void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
	    RNInvokeApp.sendEvent();
   }
}
