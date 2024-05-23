<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function send(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'message' => 'required',
        ]);

        Mail::send([], [], function ($message) use ($validatedData) {
            $message->to('destino@example.com') // Altere para o e-mail de destino
                   ->subject('New Contact Message')
                   ->from($validatedData['email'], $validatedData['name'])
                   ->setBody($validatedData['message'], 'text/plain');
        });

        return back()->with('success', 'Thank you for your message!');
    }
}
